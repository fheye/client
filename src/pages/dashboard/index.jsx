import '../../styles/output.css';
import Card from '../../components/Card';
import Layout from '../../components/Layout';

export default function Dashboard() {
    const cardData = [
        { title: "Card 1", description: "Description for card 1" },
        { title: "Card 2", description: "Description for card 2" },
        { title: "Card 3", description: "Description for card 3" },
        { title: "Card 4", description: "Description for card 4" },
    ];

    const walletAddress = "0x32Be343B94f860124dC4fEe1c7B7B8B646F6D9F";

    const formatWalletAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    return (
        <Layout>
            <span className="block text-xl font-semibold text-gray-600 mb-4">
                {formatWalletAddress(walletAddress)}
            </span>

            <div className="grid grid-cols-2 gap-4 p-4 w-full">
                {cardData.map((data, index) => (
                    <Card key={index} title={data.title} description={data.description} />
                ))}
            </div>
        </Layout>
    );
}