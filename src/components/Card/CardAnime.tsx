import { ComponentPropsWithoutRef } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { Image } from 'expo-image';

import { AnimeObject, BaseAnimeObject } from '@/types/anime';

type Props = {
  anime: Pick<AnimeObject, keyof BaseAnimeObject>;
  sx?: {
    container?: ViewStyle;
  };
} & Pick<ComponentPropsWithoutRef<typeof Pressable>, 'onPress'>;

function CardAnime({ anime, sx, ...rest }: Props) {
  return (
    <Pressable style={[styles.container, sx?.container]} {...rest}>
      {anime.main_picture?.medium && (
        <Image
          source={{ uri: anime.main_picture.medium }}
          style={styles.image}
        />
      )}
      <Text
        variant="titleSmall"
        numberOfLines={2}
        style={{ lineHeight: 18, paddingLeft: 0, height: 36 }}
      >
        {anime.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    gap: 8,
    height: 240,
  },
  image: {
    flex: 1,
    borderRadius: 16,
  },
});

export default CardAnime;
