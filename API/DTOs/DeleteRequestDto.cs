using System;

namespace API.DTOs
{
    public class DeleteRequestDto
    {
        public DateTime Startdate { get; set; }
        public DateTime Enddate { get; set; }
        public string Email { get; set; }
        public int Id { get; set; }
    }
}