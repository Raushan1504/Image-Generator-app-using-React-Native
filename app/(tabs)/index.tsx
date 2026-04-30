import * as Sharing from 'expo-sharing';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import * as FileSystem from 'expo-file-system/legacy';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Tracks the current generation so stale onLoadEnd callbacks are ignored
  const generationRef = useRef(0);

  // 🔥 Generate Image
  const generateImage = () => {
    if (!prompt.trim()) {
      Alert.alert("Enter a prompt first!");
      return;
    }

    // Increment generation counter — any in-flight onLoadEnd from a
    // previous request will see a stale id and bail out.
    const currentGeneration = ++generationRef.current;

    setLoading(true);
    setImage(null); // unmount old Image to guarantee a fresh mount

    // Use both a random seed AND a nonce to ensure the URL is unique.
    // Two params makes collisions essentially impossible.
    const encodedPrompt = encodeURIComponent(prompt);
    const randomSeed = Math.floor(Math.random() * 100000);
    const nonce = Date.now();

    const imageUrl =
      `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${randomSeed}&noCache=${nonce}`;

    // Defer setting the new URL to the next frame so React fully
    // unmounts the previous Image component first.
    requestAnimationFrame(() => {
      // Guard: if the user pressed Generate again before this fires,
      // this closure is stale — do nothing.
      if (generationRef.current !== currentGeneration) return;
      setImage(imageUrl);
    });
  };

  // Called by <Image onLoadEnd> — only dismiss spinner for the *current* generation
  const handleImageLoadEnd = () => {
    setLoading(false);
  };

  // Called by <Image onError>
  const handleImageError = () => {
    setLoading(false);
    Alert.alert("Error generating image");
  };

  // 🔗 Share Image
  const shareImage = async () => {
    if (!image) return;

    try {
      const isAvailable = await Sharing.isAvailableAsync();

      if (!isAvailable) {
        Alert.alert("Sharing not available on this device");
        return;
      }

      const fileUri = FileSystem.documentDirectory + "shared-image.jpg";

      const downloadResumable = FileSystem.createDownloadResumable(
        image,
        fileUri
      );

      const result = await downloadResumable.downloadAsync();

      if (!result || !result.uri) {
        Alert.alert("Error preparing image");
        return;
      }

      await Sharing.shareAsync(result.uri);

    } catch (error) {
      console.log(error);
      Alert.alert("Error sharing image");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Image Generator 🚀</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter prompt (e.g. astronaut dog)"
        value={prompt}
        onChangeText={setPrompt}
      />

      <Button
        title={loading ? "Generating..." : "Generate Image"}
        onPress={generateImage}
        disabled={loading}
      />

      {loading && (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      )}

      {!image && !loading && (
        <Text style={{ marginTop: 20 }}>
          Enter a prompt to generate an image
        </Text>
      )}

      {image && (
        <>
          <Image
            key={image}
            source={{ uri: image, cache: 'reload' }}
            style={styles.image}
            onLoadEnd={handleImageLoadEnd}
            onError={handleImageError}
          />

          {!loading && (
            <>
              <Text style={{ marginTop: 10 }}>
                Tap generate again for variations
              </Text>

              <Button title="Share Image" onPress={shareImage} />

              <View style={{ marginTop: 10 }}>
                <Button title="Regenerate" onPress={generateImage} />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});