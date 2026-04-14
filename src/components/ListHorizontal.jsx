// src/components/ListHorizontal.jsx
// Komponen yang menerima PROPS "data" dari induk
// Menyimpan STATE "favorit" secara internal

import { useState } from 'react';
import { FlatList, View } from 'react-native';
import ItemMenuHorizontal from './ItemMenuHorizontal';

const ListHorizontal = ({ data }) => {
  // STATE: menyimpan array id menu yang difavoritkan
  const [favorit, setFavorit] = useState([]);

  // Fungsi toggle favorit → mengubah STATE
  const toggleFavorit = (itemId) => {
    if (favorit.includes(itemId)) {
      setFavorit(favorit.filter((id) => id !== itemId));
    } else {
      setFavorit([...favorit, itemId]);
    }
  };

  const renderItem = ({ item }) => {
    // Cek apakah item ini sudah difavoritkan (dari STATE)
    const isFavorit = favorit.includes(item.id);

    return (
      // Kirim PROPS ke ItemMenuHorizontal
      <ItemMenuHorizontal
        item={item}               // PROPS: data menu
        isFavorit={isFavorit}     // PROPS: status favorit (dari STATE)
        onPress={() => toggleFavorit(item.id)} // PROPS: fungsi callback
      />
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
};

export default ListHorizontal;