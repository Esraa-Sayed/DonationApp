import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../components/BackButton/BackButton';
import globalStyle from '../../assets/styles/globalStyle';
import style from './style';
import { Image, View, Text } from 'react-native';
import Badge from '../../components/Badge/Badge';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import { useSelector } from 'react-redux';

const SingleDonationItemScreen = ({ navigation, route }) => {
  const categoryInformation = route.params.categoryInformation;
  const donationItemInformation = useSelector(
    state => state.donation.selectedDonationInformation,
  );
  console.log(donationItemInformation);
  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <Image
          source={{ uri: donationItemInformation.image }}
          style={style.image}
        />
        <View style={style.badge}>
          <Badge title={categoryInformation.name} />
        </View>
        <Header type={1} title={donationItemInformation.name} />
        <Text style={style.description}>
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
          {donationItemInformation.description}
        </Text>
      </ScrollView>
      <View style={style.button}>
        <Button title={'Donate'} />
      </View>
    </SafeAreaView>
  );
};

export default SingleDonationItemScreen;
