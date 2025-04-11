export interface Statistics {
  SubjectsCount: number;
  TestsCount: number;
  StudentCount: number;
  TeacherCount: number;
}

export interface Subject {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}
