import Course from "./components/Course";
import Courses from "./components/Courses";

const App = () => {
  const courses = Courses();

  return (
    <div>
      {courses.map((course) => (
        <Course course={course} key={course.id}/>
      ))}
    </div>
  );
};

export default App;
