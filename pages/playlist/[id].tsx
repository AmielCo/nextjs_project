import GradientLayout from "../../components/gradientLayout";
import SongTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBgColor = (id) => {
  const colors = [
    "blue",
    "green",
    "red",
    "orange",
    "purple",
    "gray",
    "pink",
    "indigo",
    "teal",
  ];
  return colors[id - 1 || colors[Math.floor(Math.random() * colors.length)]];
};

const Playlist = ({ playlist }) => {
  const color = getBgColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`You have ${playlist.songs.length} songs in this playlist`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies[process.env.TOKEN_NAME]);
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: {
      playlist,
    },
  };
};

export default Playlist;