<p align="center">
  <img width="186" height="90" src="https://user-images.githubusercontent.com/218949/44782765-377e7c80-ab80-11e8-9dd8-fce0e37c235b.png" alt="Beyonk" />
</p>

## Svelte Google Maps

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) ![publish](https://github.com/beyonk-adventures/svelte-googlemaps/workflows/publish/badge.svg) [![svelte-v3](https://img.shields.io/badge/svelte-v3-blueviolet.svg)](https://svelte.dev)

Maps and Places components in Vanilla JS (or Svelte)

Particular focus on efficient loading of Google components in an SPA.

SSR Ready

## WIP

Documentation is a WIP. Be prepared to examine the source code to get any use out of this right now!

The `GoogleMap` and `GooglePlacesAutocomplete` components are a Google Map and Google Places Autocomplete component respectively.

## Usage

### To use within a Svelte application:

```jsx
<GooglePlacesAutocomplete apiKey="your-maps-api-key"/>
<GoogleMap apiKey="your-maps-api-key"/>

<script>
  import { GoogleMap, GooglePlacesAutocomplete } from '@beyonk/svelte-googlemaps'
</script>
```

### Options

## Autocomplete

| Attribute | Purpose | Allowed | Default |
|---|---|---|---|
| ariaLabel | Sets aria-label value on input | string | 'location' |
| on:placeChanged | Place changed event (does not fire if user hit enter without selecting an address) | any function | - |
| placeholder | placeholder text | any string | - |
| styleClass | css styles for input | any classes | - |

