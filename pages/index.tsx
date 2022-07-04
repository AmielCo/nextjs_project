import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  const { user, isLoading } = useMe();

  return (
    <GradientLayout
      color="blue"
      roundImage
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`You have ${user?.playlistCount} playlists saved bro`}
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
              <Flex paddingX="10px" width="20%">
                <Box
                  bg="gray.900"
                  borderRadius="4px"
                  padding="15px"
                  min-width="90%"
                  height="calc(100% - 90px)"
                  key={artist.id}
                >
                  <Image
                    src="https://placekitten.com/300/300"
                    borderRadius="100%"
                    justify-content="center"
                    align-items="center"
                    text-align="center"
                    height="80%"
                  />
                  <Box marginTop="10px">
                    <Text fontSize="large" fontWeight="bold">
                      {artist.name}
                    </Text>
                    <Text fontSize="small">Artist</Text>
                  </Box>
                </Box>
              </Flex>
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
