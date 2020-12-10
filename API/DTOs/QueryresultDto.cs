using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class QueryresultDto
    {
        public List<string> Date { get; set; }
        public List<int> NoofHours { get; set; }
        public List<string> Taskdetail { get; set; }
        public List<string> ProjectName { get; set; }
    }
}