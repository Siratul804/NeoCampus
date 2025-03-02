"use client";
import { Map, Marker } from "pigeon-maps";

export default function SimpleMap() {
  return (
    <Map height={400} defaultCenter={[23.8103, 90.4125]} defaultZoom={13}>
      <Marker width={50} anchor={[23.8103, 90.4125]} />
    </Map>
  );
}
