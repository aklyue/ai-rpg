import { Audio } from "expo-av";

class TypewriterSoundManagerClass {
  private sound: Audio.Sound | null = null;
  private isLoaded = false;

  async loadSound() {
    if (this.isLoaded) return;

    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/text.wav")
    );
    this.sound = sound;

    await this.sound.setVolumeAsync(1);
    this.isLoaded = true;
  }

  async playTick() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/text.wav")
      );
      await sound.setVolumeAsync(1);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (!status.isPlaying) {
          sound.unloadAsync().catch(() => {});
        }
      });
    } catch (error) {
      console.log("Error playing tick sound:", error);
    }
  }

  async unload() {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.isLoaded = false;
      this.sound = null;
    }
  }
}

const TypewriterSoundManager = new TypewriterSoundManagerClass();
export default TypewriterSoundManager;
