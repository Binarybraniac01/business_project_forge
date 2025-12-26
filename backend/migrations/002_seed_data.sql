-- =====================================================
-- Seed Data for Project Forge
-- Run this after 001_initial_schema.sql
-- =====================================================

-- =====================================================
-- Seed Project Templates
-- =====================================================
INSERT INTO project_templates (title, description, difficulty, tags, features, is_featured) VALUES
(
    'AI-Powered Attendance System',
    'Face recognition-based attendance management with real-time tracking and comprehensive reporting dashboard.',
    'Advanced',
    '["Python", "OpenCV", "Flask", "MySQL"]'::jsonb,
    '["Face Detection", "Real-time Tracking", "Report Generation", "Admin Dashboard"]'::jsonb,
    true
),
(
    'Smart Traffic Management',
    'IoT-based traffic monitoring with ML prediction for congestion and automated signal optimization.',
    'Advanced',
    '["Python", "TensorFlow", "Arduino", "React"]'::jsonb,
    '["Traffic Prediction", "Signal Optimization", "Real-time Monitoring", "Analytics"]'::jsonb,
    true
),
(
    'E-Commerce Platform',
    'Full-stack online marketplace with payment integration, inventory management, and admin dashboard.',
    'Intermediate',
    '["React", "Node.js", "MongoDB", "Stripe"]'::jsonb,
    '["Product Catalog", "Shopping Cart", "Payment Gateway", "Order Tracking"]'::jsonb,
    true
),
(
    'Hospital Management System',
    'Complete HMS with patient records, appointment scheduling, billing, and pharmacy management modules.',
    'Advanced',
    '["Django", "PostgreSQL", "React", "Docker"]'::jsonb,
    '["Patient Management", "Appointment System", "Billing", "Pharmacy Module"]'::jsonb,
    false
),
(
    'Online Learning Platform',
    'LMS with video streaming, quiz modules, progress tracking, and certificate generation.',
    'Intermediate',
    '["React", "Firebase", "Node.js", "AWS"]'::jsonb,
    '["Video Streaming", "Quiz System", "Progress Tracking", "Certificates"]'::jsonb,
    false
),
(
    'Expense Tracker App',
    'Personal finance management with budget planning, expense categorization, and visual analytics.',
    'Beginner',
    '["Flutter", "Firebase", "Dart", "Charts"]'::jsonb,
    '["Budget Planning", "Expense Categories", "Analytics Dashboard", "Reports"]'::jsonb,
    false
),
(
    'Social Media Dashboard',
    'Analytics dashboard aggregating data from multiple social platforms with sentiment analysis.',
    'Advanced',
    '["Python", "React", "API Integration", "NLP"]'::jsonb,
    '["Multi-platform Analytics", "Sentiment Analysis", "Reporting", "Scheduling"]'::jsonb,
    false
),
(
    'Food Delivery System',
    'Complete food ordering platform with restaurant management, driver tracking, and payment processing.',
    'Intermediate',
    '["React Native", "Node.js", "MongoDB", "Maps API"]'::jsonb,
    '["Restaurant Listings", "Order Management", "Driver Tracking", "Payments"]'::jsonb,
    false
);

-- =====================================================
-- Seed Portfolio Projects
-- =====================================================
INSERT INTO portfolio_projects (title, description, tags, is_featured) VALUES
(
    'AI Traffic Management System',
    'Real-time traffic analysis using computer vision and ML algorithms to optimize urban traffic flow and reduce congestion.',
    '["Python", "TensorFlow", "OpenCV"]'::jsonb,
    true
),
(
    'Smart Campus Navigation',
    'Indoor navigation app featuring AR waypoints and comprehensive accessibility features for university campus wayfinding.',
    '["Flutter", "Firebase", "ARCore"]'::jsonb,
    true
),
(
    'E-Commerce Analytics Platform',
    'Full-stack analytics dashboard with predictive insights for inventory management and accurate sales forecasting tools.',
    '["React", "Django", "PostgreSQL"]'::jsonb,
    true
),
(
    'Healthcare Appointment System',
    'Comprehensive patient management system with real-time scheduling, automated reminders, and medical records tracking.',
    '["React", "Node.js", "MongoDB"]'::jsonb,
    false
),
(
    'Smart Inventory Tracker',
    'IoT-enabled inventory management platform with barcode scanning, stock alerts, and real-time analytics dashboard.',
    '["Python", "Flask", "MySQL"]'::jsonb,
    false
),
(
    'Student Portal System',
    'Comprehensive student management portal with grades tracking, attendance monitoring, and seamless course registration.',
    '["Java", "Spring Boot", "PostgreSQL"]'::jsonb,
    false
);

-- =====================================================
-- Seed Team Members
-- =====================================================
INSERT INTO team_members (name, role, bio, skills, color_theme, display_order, github_url, linkedin_url) VALUES
(
    'Alex Chen',
    'Python Expert',
    'Helping students ace their vivas since 2023. Django, Flask, ML - you name it.',
    '["Python", "Django", "Machine Learning"]'::jsonb,
    'primary',
    1,
    'https://github.com',
    'https://linkedin.com'
),
(
    'Jordan Dev',
    'Frontend Wizard',
    'Making sure your project isn''t just functional, but looks stunning too.',
    '["React", "TypeScript", "Tailwind CSS"]'::jsonb,
    'secondary',
    2,
    'https://github.com',
    'https://linkedin.com'
),
(
    'Sam Kumar',
    'Database Architect',
    'The one who makes sure your data flows smoothly. MySQL, PostgreSQL, MongoDB.',
    '["MySQL", "PostgreSQL", "System Design"]'::jsonb,
    'primary',
    3,
    'https://github.com',
    'https://linkedin.com'
);
