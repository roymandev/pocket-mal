import { StyleSheet, ViewStyle } from 'react-native';
import { Card } from 'react-native-paper';

import { Image } from 'expo-image';

import { AnimeObject, BaseAnimeObject } from '@/types/anime';

type Props = {
  anime: Pick<AnimeObject, keyof BaseAnimeObject>;
  sx?: {
    container?: ViewStyle;
  };
};

function CardAnime({ anime, sx }: Props) {
  return (
    <Card style={[styles.container, sx?.container]} mode="contained">
      {anime.main_picture?.medium && (
        <Image
          source={{ uri: anime.main_picture.medium }}
          style={styles.image}
        />
      )}
      <Card.Title
        title={anime.title}
        titleNumberOfLines={2}
        titleStyle={{ lineHeight: 18, paddingLeft: 0 }}
        style={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  image: {
    height: 195,
    borderRadius: 16,
  },
});

export default CardAnime;
