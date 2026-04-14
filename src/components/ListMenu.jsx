// src/components/ListMenu.jsx
// Komponen yang menerima PROPS "styles" dari App (induk)
// Mirip dengan pola ListBlog di materi praktikum

import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { MenuList } from '../data/menus';
import ItemMenu from './ItemMenu';
import ListHorizontal from './ListHorizontal';

// Menerima PROPS "styles" dari komponen induk (App)
export default function ListMenu({ styles }) {
  // STATE: menyimpan array id menu yang difavoritkan (untuk daftar vertikal)
  const [favorit, setFavorit] = useState([]);

  // Fungsi toggle favorit → mengubah STATE
  const toggleFavorit = (itemId) => {
    if (favorit.includes(itemId)) {
      setFavorit(favorit.filter((id) => id !== itemId));
    } else {
      setFavorit([...favorit, itemId]);
    }
  };

  // Pisahkan data: 4 pertama untuk horizontal, sisanya untuk vertikal
  const horizontalData = MenuList.slice(0, 4);
  const verticalData = MenuList.slice(4);

  return (
    <ScrollView>
      {/* Gunakan PROPS styles dari induk */}
      <View style={styles.listMenu}>

        {/* Komponen ListHorizontal menerima PROPS data */}
        <ListHorizontal data={horizontalData} />

        {/* Daftar menu vertikal */}
        <View style={styles.listCard}>
          {verticalData.map((item, index) => (
            // Komponen ItemMenu menerima PROPS item, isFavorit, onPress
            <ItemMenu
              item={item}
              key={index}
              isFavorit={favorit.includes(item.id)}     // PROPS dari STATE
              onPress={() => toggleFavorit(item.id)}    // PROPS callback
            />
          ))}
        </View>

      </View>
    </ScrollView>
  );
}