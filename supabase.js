import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xntlptjhmiswskncddwy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhudGxwdGpobWlzd3NrbmNkZHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0MTA2MTUsImV4cCI6MTk5OTk4NjYxNX0.WnxT09BuWLVdEcdSHrve0uib4_Zzu7l1VUY99PI8UaE";

// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//User
// Fetch user
async function fetchUser() {
  const { user, error } = await supabase.auth.user();

  if (error) {
    console.error("Error fetching user:", error);
    return;
  }

  console.log("User:", user);
}

fetchUser();

//Enrollments

// Fetch enrollments by user ID
const fetchEnrollmentsByUserId = async (userId) => {
  try {
    const { data, error } = await supabase.from("enrollments").select("*").eq("user_id", userId);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
// Fetch all enrollments
const fetchEnrollments = async () => {
  try {
    const { data, error } = await supabase.from("enrollments").select("*");

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Insert a new enrollment
const insertEnrollment = async (enrollmentData) => {
  try {
    const { data, error } = await supabase.from("enrollments").insert(enrollmentData);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Update an enrollment by ID
const updateEnrollment = async (enrollmentId, updates) => {
  try {
    const { data, error } = await supabase
      .from("enrollments")
      .update(updates)
      .eq("id", enrollmentId);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Delete an enrollment by ID
const deleteEnrollment = async (enrollmentId) => {
  try {
    const { data, error } = await supabase.from("enrollments").delete().eq("id", enrollmentId);

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//Lessons
// Fetch lesson content by courseId and lessonId
const fetchLessonContent = async (courseId, lessonId) => {
  try {
    const { data: lessonData, error: lessonError } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .eq("id", parseInt(lessonId, 10))
      .limit(1);

    if (lessonError) {
      console.error(lessonError);
      return null;
    }

    if (lessonData && lessonData.length > 0) {
      const lesson = lessonData[0];
      return lesson;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetch the previous lesson by courseId and lessonId
const fetchPreviousLesson = async (courseId, lessonId) => {
  try {
    const { data: previousLessonData, error: previousLessonError } = await supabase
      .from("lesson_groups")
      .select("lesson_id")
      .eq("course_id", courseId)
      .lt("lesson_id", parseInt(lessonId, 10))
      .order("lesson_id", { ascending: false })
      .limit(1);

    if (previousLessonError) {
      console.error(previousLessonError);
      return null;
    }

    if (previousLessonData && previousLessonData.length > 0) {
      const previousLessonId = previousLessonData[0].lesson_id;
      const { data: previousLessonContent, error: previousLessonContentError } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .eq("id", previousLessonId)
        .limit(1);

      if (previousLessonContentError) {
        console.error(previousLessonContentError);
        return null;
      }

      if (previousLessonContent && previousLessonContent.length > 0) {
        const previousLesson = previousLessonContent[0];
        return previousLesson;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
// Fetch lessons for a given course
const fetchLessonsByCourseId = async (courseId) => {
  try {
    const { data, error } = await supabase
      .from("lesson_groups")
      .select("lesson_id")
      .eq("course_id", courseId)
      .order("order_number", { ascending: true });

    if (error) {
      console.error(error);
      return null;
    }

    const lessonIds = data.map((lesson) => lesson.lesson_id);

    const { data: lessonData, error: lessonError } = await supabase
      .from("lessons")
      .select("id, title")
      .in("id", lessonIds);

    if (lessonError) {
      console.error(lessonError);
      return null;
    }

    return lessonData;
  } catch (error) {
    console.error(error);
    return null;
  }
};
// Fetch the next lesson by courseId and lessonId
const fetchNextLesson = async (courseId, lessonId) => {
  try {
    const { data: nextLessonData, error: nextLessonError } = await supabase
      .from("lesson_groups")
      .select("lesson_id")
      .eq("course_id", courseId)
      .gt("lesson_id", parseInt(lessonId, 10))
      .order("lesson_id", { ascending: true })
      .limit(1);

    if (nextLessonError) {
      console.error(nextLessonError);
      return null;
    }

    if (nextLessonData && nextLessonData.length > 0) {
      const nextLessonId = nextLessonData[0].lesson_id;
      const { data: nextLessonContent, error: nextLessonContentError } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .eq("id", nextLessonId)
        .limit(1);

      if (nextLessonContentError) {
        console.error(nextLessonContentError);
        return null;
      }

      if (nextLessonContent && nextLessonContent.length > 0) {
        const nextLesson = nextLessonContent[0];
        return nextLesson;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

//Courses
// Fetch all courses
const fetchAllCourses = async () => {
  try {
    const { data, error } = await supabase.from("courses").select("*");

    if (error) {
      console.error(error);
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//Posts
//Fetch posts
const fetchPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    throw new Error("Error fetching posts: " + error.message);
  }
  return data;
};

console.log(supabase);
console.log(supabase.auth);
export {
  supabase,
  fetchEnrollmentsByUserId,
  fetchAllCourses,
  fetchUser,
  fetchEnrollments,
  fetchLessonsByCourseId,
  fetchLessonContent,
  fetchNextLesson,
  fetchPreviousLesson,
  deleteEnrollment,
  insertEnrollment,
  updateEnrollment,
  fetchPosts,
};
