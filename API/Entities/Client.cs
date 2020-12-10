
using System;

namespace API.Entities
{
    public class Client
    {
        public int ID { get; set; }
        public string ClientName { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDetails { get; set; }
        public int HoursLimit { get; set; }
        public string CompleteDate { get; set; }
        public string Manager { get; set; }
        public string CompleteDateTime { get; set; }
    }
}