"use client";

import dynamic from "next/dynamic";

// Kept in its own module so editing app/page.tsx during development does not
// re-create the lazy component and remount Leaflet mid-refresh.
const OriginMap = dynamic(() => import("./OriginMap"), {
  ssr: false,
  loading: () => <div className="map-loading">Loading the living world map…</div>,
});

export default OriginMap;
