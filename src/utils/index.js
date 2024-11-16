import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
    uri: 'https://f132-1-47-223-132.ngrok-free.app/subgraphs/name/fheye-facedetection',
    cache: new InMemoryCache(),
})

export async function getCloseCriminalCount(locationX, locationY, distance) {
    try {
        const GET_REVEALED_IMAGES = gql`
            query GetRevealedImagesByLocation($minX: BigInt!, $maxX: BigInt!, $minY: BigInt!, $maxY: BigInt!) {
                images(
                    where: {
                        isRevealed: true, 
                        detectionCount_gt: 0,
                        locationX_gte: $minX, 
                        locationX_lte: $maxX, 
                        locationY_gte: $minY, 
                        locationY_lte: $maxY
                    }
                ) {
                    id
                    locationX
                    locationY
                    timestamp
                    uploader {
                        id
                    }
                }
            }
        `

        const { data } = await client.query({
            query: GET_REVEALED_IMAGES,
            variables: {
                minX: locationX - distance,
                maxX: locationX + distance,
                minY: locationY - distance,
                maxY: locationY + distance,
            },
        })

        return data.images
    } catch (error) {
        console.error('Error fetching nearby criminals:', error.message)
        return []
    }
}

export async function getMostPopularImages() {
    try {
        const GET_POPULAR_IMAGES = gql`
            query GetMostPopularImages {
                images(
                    orderBy: detectionCount,
                    orderDirection: desc,
                    first: 5
                ) {
                    id
                    locationX
                    locationY
                    timestamp
                    uploader {
                        id
                    }
                }
            }
        `

        const { data } = await client.query({
            query: GET_POPULAR_IMAGES,
        })

        return data.images
    } catch (error) {
        console.error('Error fetching most popular images:', error.message)
        return []
    }
}

export async function getLatestActivityFeeds() {
    try {
        const GET_ACTIVITY_FEEDS = gql`
            query GetLatestActivityFeeds {
                faceDetectionEvents(orderBy: timestamp, orderDirection: desc, first: 5) {
                    id
                    user { id }
                    image { id }
                    distance
                    timestamp
                }
                metadataAccessEvents(orderBy: timestamp, orderDirection: desc, first: 5) {
                    id
                    image { id }
                    accessor { id }
                    fee
                    locationX
                    locationY
                    timestamp
                }
            }
        `

        const { data } = await client.query({
            query: GET_ACTIVITY_FEEDS,
        })

        return data
    } catch (error) {
        console.error('Error fetching latest activity feeds:', error.message)
        return {}
    }
}

export async function getNearbyUsers(locationX, locationY, distance) {
    try {
        const GET_NEARBY_USERS = gql`
            query GetUsersByLocation($minX: Int!, $maxX: Int!, $minY: Int!, $maxY: Int!) {
                users(where: { locationX_gte: $minX, locationX_lte: $maxX, locationY_gte: $minY, locationY_lte: $maxY }) {
                    id
                    locationX
                    locationY
                }
            }
        `

        const { data } = await client.query({
            query: GET_NEARBY_USERS,
            variables: {
                minX: locationX - distance,
                maxX: locationX + distance,
                minY: locationY - distance,
                maxY: locationY + distance,
            },
        })

        return data.users
    } catch (error) {
        console.error('Error fetching nearby users:', error.message)
        return []
    }
}

export async function getUserInfo(userId) {
    try {
        const GET_USER_INFO = gql`
            query GetUserInfo($userId: Bytes!) {
                user(id: $userId) {
                    id
                    locationX
                    locationY
                    alertDistance
                    rewards
                    queryCount
                    uploadedImagesCount
                }
            }
        `

        const { data } = await client.query({
            query: GET_USER_INFO,
            variables: { userId },
        })

        return data.user
    } catch (error) {
        console.error('Error fetching user info:', error.message)
        return {}
    }
}
