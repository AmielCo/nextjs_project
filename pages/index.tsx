import { Box, Flex, Text } from "@chakra-ui/layout";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  return (
    <GradientLayout
      color="blue"
      roundImage
      subtitle="profile"
      title="Amiel Coronel"
      description="15 public playlists"
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top Artists this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => {
            return (
              <Box
                bg="gray.900"
                borderRadius="4px"
                padding="15px"
                key={artist.id}
              >
                <Text>{artist.name}</Text>
              </Box>
            );
          })}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  console.log("artists", artists);
  return {
    props: { artists },
  };
};

export default Home;
