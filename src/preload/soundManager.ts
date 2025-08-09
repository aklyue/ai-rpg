import { Audio } from "expo-av";

class SoundManagerClass {
  private sound: Audio.Sound | null = null;
  private isLoaded = false;

  async loadSound() {
    if (this.isLoaded) return;

    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/button.wav")
    );
    this.sound = sound;

    await this.sound.setVolumeAsync(0);
    await this.sound.playAsync();

    setTimeout(() => {
      this.sound?.stopAsync().catch(() => {});
    }, 100);

    this.isLoaded = true;
  }

  async playClickSound() {
    if (!this.isLoaded || !this.sound) return;
    try {
      await this.sound.stopAsync();
      await this.sound.setPositionAsync(0);
      await this.sound.setVolumeAsync(1);
      await this.sound.playAsync();
    } catch {}
  }

  async unload() {
    if (this.sound) {
      await this.sound.unloadAsync();
      this.isLoaded = false;
      this.sound = null;
    }
  }
}

const SoundManager = new SoundManagerClass();
export default SoundManager;
