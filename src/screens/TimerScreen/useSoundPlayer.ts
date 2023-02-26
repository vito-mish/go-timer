import {useCallback, useEffect, useRef} from 'react'
import Sound from 'react-native-sound'

import {logger} from '../../services'

export const useSoundPlayer = () => {
  const player = useRef<Sound | null>(null)

  useEffect(() => {
    Sound.setCategory('Playback')
    player.current = new Sound('sound_click.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        logger.error('failed to load the sound', error)
        return
      }
      player.current?.setVolume(0.5)
    })

    return () => {
      player.current?.release()
    }
  }, [])

  // Note: always replay
  const playClick = useCallback(() => {
    player.current?.stop(() => {
      player.current?.play()
    })
  }, [])

  return {playClick}
}

/*

! how to add new sound

Android: Save your sound clip files under the directory android/app/src/main/res/raw.
iOS: Open Xcode and add your sound files to the project (Right-click the project and select Add Files to [PROJECTNAME])

*/
