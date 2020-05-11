import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';

export const Container = styled.View`
  flex: 1;
`;

export const Browser = styled(WebView)`
  flex: 1;
`;

export const LoadingContainer = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const LoadingSpinner = styled.ActivityIndicator.attrs({
  size: 'large',
  color: '#7159C1',
})``;
