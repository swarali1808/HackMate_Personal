export interface EducationInput {
    type: "SCHOOL" | "COLLEGE";
    instituteName: string;
    fieldOfStudy?: string;
    degree?: string;
    grade?: number;
    startYear: number;
    endYear?: number;
  }