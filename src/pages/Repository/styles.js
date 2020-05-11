import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';

export const Container = styled.View`
  flex: 1;
`;

export const Browser = styled(WebView)`
  flex: 1;
`;

export const LoadingSpinner = styled.ActivityIndicator`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
