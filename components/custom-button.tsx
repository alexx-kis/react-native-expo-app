import { Text, TouchableOpacity } from 'react-native';

// ^======================== CustomButton ========================^ //

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles: string;
  textStyles: string;
  isLoading: boolean;
};

function CustomButton(customButtonProps: CustomButtonProps): React.JSX.Element {

  const { title, handlePress, containerStyles, textStyles, isLoading } = customButtonProps;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`
        bg-secondary 
          rounded-xl 
          min-h-[62px] 
          justify-center 
          items-center 
          ${containerStyles}
          ${isLoading ? 'opacity-50' : ''}
        `}
      disabled={isLoading}
    >
      <Text
        className={`
        text-primary 
          font-psemibold 
          text-lg
          ${textStyles}
        `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
export default CustomButton;