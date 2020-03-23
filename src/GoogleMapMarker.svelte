<script>
  import { getContext } from "svelte";
  import { key } from "./contexts.js";

  const { getMap } = getContext(key);
  const map = getMap();

  export let lat;
  export let lon;
  export let label;

  var marker = new google.maps.Marker({
    position: { lat: -25.344, lng: 131.036 },
    map: map
  });
</script>
