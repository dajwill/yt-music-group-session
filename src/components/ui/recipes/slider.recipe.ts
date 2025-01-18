import { defineSlotRecipe } from "@chakra-ui/react"

export const sliderRecipe = defineSlotRecipe({
    slots: ['root', 'track'],
    variants: {
        size: {
            xs: {
                root: {
                    "--slider-thumb-size": ".75em",
                    "--slider-track-size": ".25em",
                },
                track: {
                    borderRadius: 0,
                }
            },
        },
    },
})
