import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import { sliderRecipe } from "./recipes/slider.recipe"

const customConfig = defineConfig({
    theme: {
      slotRecipes: {
        slider: sliderRecipe
      }
    }
  })
  
export default createSystem(defaultConfig, customConfig)