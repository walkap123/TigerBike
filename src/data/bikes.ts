export type Bike = {
  id: string;
  name: string;
  location: string;
  battery: number; // percentage
  available: boolean;
};

export const BIKES: Bike[] = [
  { id: '1', name: 'Tiger-01', location: 'Main St & 1st Ave', battery: 92, available: true },
  { id: '2', name: 'Tiger-02', location: 'Central Park North', battery: 78, available: true },
  { id: '3', name: 'Tiger-03', location: 'Downtown Library', battery: 45, available: true },
  { id: '4', name: 'Tiger-04', location: 'Riverside Dock', battery: 61, available: false },
  { id: '5', name: 'Tiger-05', location: 'West Market', battery: 88, available: true },
  { id: '6', name: 'Tiger-06', location: 'University Ave', battery: 33, available: true },
];
