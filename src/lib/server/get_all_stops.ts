import { options, url_stops } from "$lib/server/golem";
import { writeFileSync } from "fs";
const golem_params1 = {
  limit: "10000",
};
const golem_params2 = {
  limit: "10000",
  offset: "10000",
};
const url1 = url_stops + "?" + new URLSearchParams(golem_params1).toString();
const url2 = url_stops + "?" + new URLSearchParams(golem_params2).toString();
const [res1, res2] = await Promise.all([
  fetch(url1, options),
  fetch(url2, options),
]);
const [body1, body2] = await Promise.all([res1.json(), res2.json()]);
// console.log(body1.features[0])
const golem_stops: Array<golem_stop> = [...body1.features, ...body2.features];
export let stops: Array<{
  name: string;
  id: string;
  lat: number;
  lon: number;
}> = [];

golem_stops.forEach((golemStop: golem_stop) => {
  const name = golemStop.properties.stop_name;
  const id = golemStop.properties.stop_id;
  if (name != null && id != null && id.endsWith("P")) {
    stops = [
      ...stops,
      {
        name: name,
        id: id,
        lat: golemStop.geometry.coordinates[1],
        lon: golemStop.geometry.coordinates[0],
      },
    ];
  }
});

writeFileSync("./src/lib/server/stops.json", JSON.stringify(stops));

export let stopNames: Array<string> = [];
stops.forEach((stop: any) => {
  const name: string = stop.name;
  if (name != null && !stopNames.includes(name)) {
    stopNames = [...stopNames, name];
  }
});
writeFileSync("./src/lib/server/stopNames.json", JSON.stringify(stopNames));
