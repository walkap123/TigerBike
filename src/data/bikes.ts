export type Bike = {
  id: string;
  name: string;
  location: string;
  battery: number;
  available: boolean;
  coordinate: { latitude: number; longitude: number };
};

export const BIKES: Bike[] = [
  { id: '1', name: 'Tiger-01', location: 'Nassau Hall',            battery: 92, available: true,  coordinate: { latitude: 40.3438,  longitude: -74.6596 } },
  { id: '2', name: 'Tiger-02', location: 'Firestone Library',      battery: 78, available: true,  coordinate: { latitude: 40.3428,  longitude: -74.6572 } },
  { id: '3', name: 'Tiger-03', location: 'Princeton Stadium',      battery: 45, available: true,  coordinate: { latitude: 40.3461,  longitude: -74.6519 } },
  { id: '4', name: 'Tiger-04', location: 'McCarter Theatre',       battery: 61, available: false, coordinate: { latitude: 40.3507,  longitude: -74.6590 } },
  { id: '5', name: 'Tiger-05', location: 'Frist Campus Center',    battery: 88, available: true,  coordinate: { latitude: 40.3450,  longitude: -74.6555 } },
  { id: '6', name: 'Tiger-06', location: 'Princeton Train Station',battery: 33, available: true,  coordinate: { latitude: 40.3499,  longitude: -74.6626 } },
];
