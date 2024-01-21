import theme from "../../themes/theme.module.scss";

const giveColor = (change: number) => {
  if (change > 0) {
    return theme.increment;
  } else if (change < 0) {
    return theme.decrement;
  }
  return theme.neutral;
};

export default giveColor;
