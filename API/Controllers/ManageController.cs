using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class ManageController : BaseAPIController
    {
        private readonly DataContext _context;
        public ManageController(DataContext context)
        {
            _context = context;
        }
        [HttpPost("addclient")]
        public async Task<ActionResult<string>> Addnewclient(NewClientDto newClientDto)
        {
            
            var Datestring = newClientDto.CompleteDate.ToShortDateString();
            var Date = newClientDto.CompleteDate.ToString("yyyy-MM-dd");
            var client = new Client
            {
                ClientName = newClientDto.ClientName,
                ProjectName = newClientDto.ProjectName,
                ProjectDetails = newClientDto.ProjectDetails,
                HoursLimit = newClientDto.HoursLimit,
                CompleteDate = Datestring,
                Manager = newClientDto.ManagerMail,
                CompleteDateTime = Date
            };
            _context.ClientTable.Add(client);
            await _context.SaveChangesAsync();
            return null;
        }

        [HttpPost("fetchprojects")]
        public async Task<ActionResult<ProjectDto>> FetchProjects(ProjectRequestDto projectRequestDto)
        {
            var projectName = await _context.ClientTable.Where(x => x.ClientName == projectRequestDto.ClientName).Select(x => x.ProjectName).ToListAsync();

            var projectDetails = await _context.ClientTable.Where(x => x.ClientName == projectRequestDto.ClientName).Select(x => x.ProjectDetails).ToListAsync();

            var projectId = await _context.ClientTable.Where(x => x.ClientName == projectRequestDto.ClientName).Select(x => x.ID).ToListAsync();
            
            var endDate = await _context.ClientTable.Where(x => x.ClientName == projectRequestDto.ClientName).Select(x => x.CompleteDateTime).ToListAsync();

            var HoursLimit = await _context.ClientTable.Where(x => x.ClientName == projectRequestDto.ClientName).Select(x => x.HoursLimit).ToListAsync();

            return new ProjectDto{
                HoursLimit = HoursLimit,
                ProjectName = projectName,
                ProjectDetails = projectDetails,
                ProjectID = projectId,
                EndDate = endDate                
            };
        }

        [HttpPost("addalloweddate")]
        public ActionResult<AppUser> AddAllowedDate(AllowedDto allowedDto){

            var user = _context.Users.First(x => x.Email_ID == allowedDto.UserEmail);

            user.AllowedDate = allowedDto.ChosenDate;
            //_context.Update(user);
            _context.Attach<AppUser>(user).State = EntityState.Modified;

            _context.SaveChanges();
            
            return user;
        }

        [HttpPost("pullreports")]
        public async Task<IEnumerable<Timesheet>> PullReports(PullReportDto pullReportDto){
            var StartDate = pullReportDto.StartDate.ToString("yyyyMMdd");
            var EndDate = pullReportDto.EndDate.ToString("yyyyMMdd");
            var timesheet = await _context.Timesheet.OrderBy(x => x.Id).Where(x => string.Compare(x.Dateshortstring,StartDate) >=0 && string.Compare(x.Dateshortstring, EndDate) <= 0).ToListAsync();
            return timesheet;
        }

        [HttpPost("deletereports")]
        public async Task<ActionResult<string>> DeleteReports(PullReportDto pullReportDto){
            var StartDate = pullReportDto.StartDate.ToString("yyyyMMdd");
            var EndDate = pullReportDto.EndDate.ToString("yyyyMMdd");

            var timesheetids =await  _context.Timesheet.Where(x => string.Compare(x.Dateshortstring,StartDate) >=0 && string.Compare(x.Dateshortstring, EndDate) <= 0).Select(x => x.Id).ToListAsync();
            for(var i=0 ; i < timesheetids.Count; i++)
            {
                var timesheet = await _context.Timesheet.SingleOrDefaultAsync(x => x.Id == timesheetids[i]);
                _context.Timesheet.Remove(timesheet);
                await _context.SaveChangesAsync();
            }
            
            return null;
        }

        [HttpPost("changepassword")]
        public async Task<ActionResult<string>> ChangePassword(ChangePasswordDto changePasswordDto){
            using var hmac = new HMACSHA512();
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email_ID == changePasswordDto.Username);

            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(changePasswordDto.Password));
            user.PasswordSalt = hmac.Key;

            _context.Attach<AppUser>(user).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return null;
        }

        [HttpPost("deleteuser")]
        public async Task<ActionResult<string>> DeleteUser(DeleteDto deleteDto){
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email_ID == deleteDto.Email);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            var usermail = await _context.UsrEmail.SingleOrDefaultAsync(x => x.EmailID == deleteDto.Email);
            _context.UsrEmail.Remove(usermail);
            await _context.SaveChangesAsync();
            
            return null;
        }

    
    }
}