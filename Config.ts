import * as Updates from 'expo-updates';

const Config = {
  enablePresistentQuery: false,
};

if (Updates.channel === 'production') {
  Config.enablePresistentQuery = true;
} else if (Updates.channel === 'preview') {
  Config.enablePresistentQuery = true;
}

export default Config;
