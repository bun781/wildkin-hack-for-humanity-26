"use client";

import L, { type Map as LeafletMap } from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from "react-leaflet";

export type MapAnimal = {
  code: string;
  name: string;
  species: string;
  place: string;
  habitat: string;
  lat: number;
  lng: number;
  color: string;
  marker: string;
};

function FollowSelection({ animal }: { animal: MapAnimal }) {
  const map = useMap();
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    map.flyTo([animal.lat, animal.lng], 5, { duration: 1.2 });
  }, [animal, map]);
  return null;
}

function markerIcon(animal: MapAnimal, active: boolean) {
  return L.divIcon({
    className: "oddkin-map-marker-wrap",
    html: `<span class="oddkin-map-marker${active ? " active" : ""}" style="--marker-color:${animal.color}"><i>${animal.marker}</i><b></b></span>`,
    iconSize: active ? [58, 68] : [46, 56],
    iconAnchor: active ? [29, 60] : [23, 49],
    popupAnchor: [0, active ? -61 : -49],
  });
}

export default function OriginMap({ animals, selectedCode, onSelect }: { animals: MapAnimal[]; selectedCode: string; onSelect: (code: string) => void }) {
  const mapRef = useRef<LeafletMap | null>(null);
  const selected = useMemo(() => animals.find((animal) => animal.code === selectedCode) ?? animals[0], [animals, selectedCode]);

  return (
    <div className="open-street-map">
      <MapContainer ref={mapRef} center={[10, 25]} zoom={2} minZoom={2} maxZoom={9} scrollWheelZoom={false} zoomControl={false} worldCopyJump>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomleft" />
        {animals.map((animal) => (
          <Marker
            key={animal.code}
            position={[animal.lat, animal.lng]}
            icon={markerIcon(animal, animal.code === selected.code)}
            eventHandlers={{ click: () => onSelect(animal.code) }}
            riseOnHover
          >
            <Popup>
              <div className="map-popup-copy"><span>{animal.code}</span><strong>{animal.name}</strong><b>{animal.species}</b><p>{animal.place}</p></div>
            </Popup>
          </Marker>
        ))}
        <FollowSelection animal={selected} />
      </MapContainer>
      <div className="map-corner-label"><span>LIVE HABITAT MAP</span><b>{selected.place}</b></div>
      <button className="map-reset" type="button" onClick={() => mapRef.current?.flyTo([10, 25], 2, { duration: 1 })}>View world</button>
    </div>
  );
}
