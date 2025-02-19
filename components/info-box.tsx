// ^======================== InfoBox ========================^ //

import { Text, View } from 'react-native';

type InfoBoxProps = {
  title?: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
};

function InfoBox(infoBoxProps: InfoBoxProps): React.JSX.Element {

  const { title, subtitle, containerStyles, titleStyles } = infoBoxProps;

  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
    </View>
  );
}
export default InfoBox;