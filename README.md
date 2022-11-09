# react-native-pk-image-picker

A customizable react-native image picker

## Installation

```sh
npm install react-native-pk-image-picker
```
or
```
yarn add react-native-pk-image-picker
```

## Usage

```js
import { PKImagePicker } from 'react-native-pk-image-picker';

// ...

const [isOpen, setIsOpen] = useState(false);
const handleOpenPicker = () => setIsOpen(true);
const handleClosePicker = () => setIsOpen(false);

<PKImagePicker
  isVisible={isOpen}
  multiple={true}
  onClose={handleClosePicker}
  maximum={10}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
