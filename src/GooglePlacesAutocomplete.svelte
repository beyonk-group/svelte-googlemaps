<GoogleSdk {apiKey} on:ready={initialise} />
<input aria-label={ariaLabel} class={styleClass} {placeholder} bind:this={search} type="text" {disabled} bind:value={viewValue} on:blur={blur} on:keydown={autocompleteKeydown} />

<script>
  import GoogleSdk from './GoogleSdk.svelte'
  import { createEventDispatcher } from 'svelte'

  export let apiKey = null
  export let ariaLabel = 'location'
  export let placeholder = 'Location'
  export let styleClass = ''
  export let value = null
  export let viewValue = null
  export let options = {
    types: ['(regions)'],
    fields: ['geometry', 'formatted_address']
  }

  let search
  let autocomplete
  let currentPlace
  let disabled = true
  let dropdown

  const dispatch = createEventDispatcher()

  export function clear () {
    value = null
    viewValue = null
    currentPlace = null

    dispatch('clear')
  }

  function dropdownVisible () {
    return document.querySelectorAll('.pac-container')[0].offsetParent !== null
  }

  function autocompleteKeydown (e) {
    if (e.keyCode == 13 && dropdownVisible()) { 
      e.preventDefault()
    }
  }

  function blur () {
    dispatch('blur')
    if (viewValue !== currentPlace) {
      clear()
    }
  }

  function initialise () {
    const google = window['google']
    autocomplete = new google.maps.places.Autocomplete(
      search,
      options
    )

    disabled = false

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      if (!place.geometry) {
        return clear()
      }

      const { formatted_address } = place
      value = place
      viewValue = formatted_address
      currentPlace = formatted_address
      dispatch('placeChanged', { place })
    })

    dispatch('ready')
  }
</script>