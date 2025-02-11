"use client";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import L from "leaflet";

// ایجاد یک آیکون سفارشی برای Marker (چون آیکون پیش‌فرض نمایش داده نمی‌شود)
const customIcon = new L.Icon({
  iconUrl: "/mobileMenuIcon.svg", // مسیر آیکون
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const LocationPicker = ({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) => {
  useMapEvent("click", (event) => {
    onLocationSelect(event.latlng.lat, event.latlng.lng);
  });

  return null;
};

const Map = () => {
  const [position, setPosition] = useState<[number, number]>([35.6892, 51.389]); // تهران
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);
  const [address, setAddress] = useState<string | null>(null);
  const [fetchAbortController, setFetchAbortController] =
    useState<AbortController | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setPosition([location.coords.latitude, location.coords.longitude]);
        },
        (error) => {
          console.error("موقعیت جغرافیایی در دسترس نیست:", error);
        }
      );
    }
  }, []);

  const fetchAddress = async (lat: number, lng: number) => {
    // لغو درخواست قبلی (در صورتی که هنوز در حال اجراست)
    if (fetchAbortController) {
      fetchAbortController.abort();
    }

    const newController = new AbortController();
    setFetchAbortController(newController);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=fa`,
        { signal: newController.signal }
      );
      const data = await response.json();
      if (data?.display_name) {
        setAddress(data.display_name); // نمایش آدرس در `input`
      } else {
        setAddress("آدرس نامشخص");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("خطا در دریافت آدرس:", error);
        setAddress("خطا در دریافت آدرس");
      }
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
    fetchAddress(lat, lng); // دریافت آدرس برای مختصات انتخاب شده
  };

  return (
    <div>
      <div className="mb-4">
        <input
          value={address || ""}
          type="text"
          placeholder="آدرس"
          className="w-full border p-2"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <MapContainer
        center={position}
        zoom={13}
        className="h-[500px] w-full rounded-lg shadow-md"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* لایه‌ی نقشه (اینجا OpenStreetMap) */}
        <LocationPicker onLocationSelect={handleLocationSelect} />

        {/* کامپوننتی که کلیک روی نقشه را دریافت می‌کند */}

        {selectedPosition && (
          <Marker position={selectedPosition} icon={customIcon}>
            <Popup>
              <p>
                مختصات: {selectedPosition[0]}, {selectedPosition[1]}
              </p>
              <p>📍 آدرس: {address ? address : "در حال دریافت آدرس..."}</p>
            </Popup>
          </Marker>
        )}

        {/* Marker برای نمایش موقعیت کاربر */}
        <Marker position={position} icon={customIcon}>
          <Popup>شما اینجا هستید!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
