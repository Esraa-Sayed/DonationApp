import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import Tab from '../../components/Tab/Tab';
import { updateSelectedCategoryId } from '../../redux/reducers/Categories';
import { updateSelectedDonationId } from '../../redux/reducers/Donations';
import Header from '../../components/Header/Header';

import globalStyle from '../../assets/styles/globalStyle';
import style from './style';
import Search from '../../components/Search/Search';
import SingleDonationItem from '../../components/SingleDonationItem/SingleDonationItem';
import { Routes } from '../../navigation/Routes';

const Home = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const donations = useSelector(state => state.donation);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [donationItems, setDonationItems] = useState([]);
  const categoryPageSize = 4;
  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) {
      return [];
    }
    return items.slice(startIndex, endIndex);
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const filterItems = donations.donationItems.filter(item =>
      item.categoryIds.includes(categories.selectedCategoryId),
    );
    setDonationItems(filterItems);
  }, [categories.selectedCategoryId]);
  useEffect(() => {
    setLoading(true);
    setCategoryList(
      pagination(categories.categories, categoryPage, categoryPageSize),
    );
    setCategoryPage(prevPage => prevPage + 1);
    setLoading(false);
  }, []);
  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.header}>
          <View>
            <Text style={style.headerIntroText}>Hello, </Text>
            <View style={style.username}>
              <Header
                title={user.firstName + ' ' + user.lastName[0] + '. 👋'}
              />
            </View>
          </View>
          <Image
            source={{ uri: user.profileImage }}
            style={style.profileImage}
            resizeMode={'contain'}
          />
        </View>
        <View style={style.searchBox}>
          <Search />
        </View>
        <Pressable style={style.highlightedImageContainer}>
          <Image
            style={style.highlightedImage}
            source={require('../../assets/images/highlighted_image.png')}
            resizeMode={'contain'}
          />
        </Pressable>
        <View style={style.categoryHeader}>
          <Header title={'Select Category'} type={2} />
        </View>
        <View style={style.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (loading) return;
              setLoading(true);
              let data = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize,
              );
              if (data.length > 0) {
                setCategoryList(prevList => [...prevList, ...data]);
                setCategoryPage(prevPage => prevPage + 1);
              }
              setLoading(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            renderItem={({ item }) => (
              <View style={style.categoryItem} key={item.categoryId}>
                <Tab
                  tabId={item.categoryId}
                  onPress={value =>
                    dispatch(
                      updateSelectedCategoryId({ selectedCategoryId: value }),
                    )
                  }
                  title={item.name}
                  isInactive={item.categoryId !== categories.selectedCategoryId}
                />
              </View>
            )}
          />
        </View>
        {donationItems.length > 0 && (
          <View style={style.donationItemsContainer}>
            {donationItems.map(value => {
              const categoryInformation = categories.categories.find(
                val => val.categoryId === categories.selectedCategoryId,
              );
              return (
                <View
                  key={value.donationItemId}
                  style={style.singleDonationItem}
                >
                  <SingleDonationItem
                    onPress={selectedDonationId => {
                      dispatch(updateSelectedDonationId(selectedDonationId));
                      navigation.navigate(Routes.SingleDonationItem, {
                        categoryInformation,
                      });
                    }}
                    donationItemId={value.donationItemId}
                    uri={value.image}
                    donationTitle={value.name}
                    badgeTitle={categoryInformation.name}
                    price={parseFloat(value.price)}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
