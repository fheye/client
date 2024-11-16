export default function Layout({ children }) {
    return (
        <div className='flex flex-col items-center justify-center py-8 px-2 my-8 md:px-5 lg:px-10 mx-auto max-w-1250p h-screen  shadow-custom-mine'>
            {children}
        </div>
    )
}