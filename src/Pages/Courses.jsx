import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Star, ChevronDown, BookmarkPlus } from 'lucide-react';
import { Card} from '../MyComponents/ui/Card';
import "../styles/Courses.css";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    subject: '',
    level: '',
    duration: '',
    sortBy: 'popular'
  });
  const [expandedCourse, setExpandedCourse] = useState(null);

  // Sample course data - in real app, this would come from an API
  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      partner: "MathWhiz Academy",
      description: "Master complex mathematical concepts with hands-on exercises",
      subject: "Mathematics",
      level: "Advanced",
      duration: "12 weeks",
      rating: 4.8,
      reviews: 245,
      enrolled: 1200,
      image: "/api/placeholder/400/225",
      price: 0, // Free course
      tags: ["Calculus", "Algebra", "Statistics"],
      chapters: [
        "Introduction to Advanced Calculus",
        "Linear Algebra Fundamentals",
        "Statistical Analysis"
      ]
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      partner: "ScienceHub",
      description: "Understanding basic physics principles through interactive lessons",
      subject: "Physics",
      level: "Beginner",
      duration: "8 weeks",
      rating: 4.6,
      reviews: 180,
      enrolled: 850,
      image: "/api/placeholder/400/225",
      price: 10, // Credit cost
      tags: ["Mechanics", "Thermodynamics", "Waves"],
      chapters: [
        "Classical Mechanics",
        "Heat and Energy",
        "Wave Motion"
      ]
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedFilters.subject || course.subject === selectedFilters.subject;
    const matchesLevel = !selectedFilters.level || course.level === selectedFilters.level;
    const matchesDuration = !selectedFilters.duration || course.duration === selectedFilters.duration;
    return matchesSearch && matchesSubject && matchesLevel && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
        <p className="text-gray-600">Discover educational content from our trusted course partners</p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFilters.subject}
            onChange={(e) => setSelectedFilters({...selectedFilters, subject: e.target.value})}
          >
            <option value="">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
          </select>

          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFilters.level}
            onChange={(e) => setSelectedFilters({...selectedFilters, level: e.target.value})}
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedFilters.sortBy}
            onChange={(e) => setSelectedFilters({...selectedFilters, sortBy: e.target.value})}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold">{course.title}</CardTitle>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <BookmarkPlus size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600">{course.partner}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {course.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{course.rating}</span>
                  <span className="text-sm text-gray-600">({course.reviews})</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">{course.enrolled} enrolled</span>
                </div>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                >
                  {course.price === 0 ? 'Enroll Free' : `${course.price} Credits`}
                </button>
              </div>

              {/* Expanded Content */}
              {expandedCourse === course.id && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Course Chapters:</h4>
                  <ul className="space-y-2">
                    {course.chapters.map((chapter, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <ChevronDown size={16} />
                        {chapter}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;