import { ComponentPropsWithoutRef } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { Image } from 'expo-image';

import { components } from '@/schema';

export type CardAnimeProps = {
  anime: Pick<components['schemas']['anime'], 'mal_id' | 'titles' | 'images'>;
  sx?: {
    container?: ViewStyle;
  };
} & Pick<ComponentPropsWithoutRef<typeof Pressable>, 'onPress'>;

function CardAnime({ anime, sx, ...rest }: CardAnimeProps) {
  return (
    <Pressable style={[styles.container, sx?.container]} {...rest}>
      {anime.images?.jpg?.image_url && (
        <Image
          source={{ uri: anime.images?.jpg?.image_url }}
          style={styles.image}
        />
      )}
      <Text
        variant="titleSmall"
        numberOfLines={2}
        style={{ lineHeight: 18, paddingLeft: 0, height: 36 }}
      >
        {anime.titles?.[0]?.title}
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
