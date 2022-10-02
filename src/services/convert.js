export default function (number, input, output) {
  const { Value: value1 } = input;
  const { Value: value2, Nominal } = output;
  const ratio = value1 / value2;
  return (number * ratio * Nominal).toFixed(2);
}
