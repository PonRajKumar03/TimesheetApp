using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class ProjectDto
    {
        public List<string> ProjectName { get; set; }
        public List<string> ProjectDetails { get; set; }
        public List<int> ProjectID { get; set; }
        public List<string> EndDate { get; set; }
        public List<int> HoursLimit { get; set; }
    }
}