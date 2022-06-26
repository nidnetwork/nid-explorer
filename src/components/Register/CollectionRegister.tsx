import { SimpleGrid } from "@chakra-ui/react";
import NFTCollection from "./NFTCollection";

import bayc from "@/assets/logos/bayc.png";
import cryptopunks from "@/assets/logos/cryptopunks.png";
import udderchaos from "@/assets/logos/udder-chaos.gif";

const collections = [
  {
    title: "BoredApeYachtClub",
    description:
      "BAYC is a collection of 10,000 Bored Ape NFTs. Owning a Bored Ape doubles as your membership to the Club.",
    total: "10,000",
    tags: ["ape", "bayc"],
    logo: bayc.src,
  },

  {
    title: "CryptoPunks",
    description:
      "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
    total: "10,000",
    tags: ["CryptoPunks"],
    logo: cryptopunks.src,
  },

  {
    title: "Udder Chaos",
    description:
      "High quality collectible art and innovative utility. Udder Chaos is bringing clarity to the DYOR process by launching a user-based NFT review site. The site, Alpha Audits, will have a review-to-earn mechanism where holders are rewarded for leaving accurate reviews! Udder Chaos is also operating a Solana validator which generates steadily increasing passive income for holders. This project has been designed with sustainability and transparency in mind.",
    total: "6,666",
    tags: ["UdderChaos"],
    logo: udderchaos.src,
  },
];

export default function RegisterGuide({ nns: string }) {
  return (
    <SimpleGrid columns={[2, null, 3]} spacing="40px" mt={4}>
      {collections.map((collection, index) => (
        <NFTCollection key={index} collection={collection} />
      ))}
    </SimpleGrid>
  );
}
