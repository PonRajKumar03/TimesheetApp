using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseAPIController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("emplist")]
        public async Task<ActionResult<EmployeeListDto>> EmpList(RequestDto requestDto)
        {
                var empls = await _context.Users.Where(x => x.ManagerMail == requestDto.ManagerName).Select(x => x.FirstName).ToListAsync();
                var users = empls.ToArray();
               return new EmployeeListDto{
                   EmpList = users,
                   Length = users.Length
               }; 
        }

        [HttpPost("viewsheet")]
        public async Task<ActionResult<QueryresultDto>> ViewSheet(ViewrequestDto viewrequestDto)
        {
                var StartDate = viewrequestDto.Startdate.ToString("yyyyMMdd");
                var EndDate = viewrequestDto.Enddate.ToString("yyyyMMdd");
                var Useremail = viewrequestDto.Email;

                var Date = await _context.Timesheet.OrderBy(x => x.Id).Where(x => x.Email_ID == Useremail && string.Compare(x.Dateshortstring,StartDate) >=0 && string.Compare(x.Dateshortstring, EndDate) <= 0).Select(x => x.Datestring).ToListAsync();

                var Number_of_hours = await _context.Timesheet.OrderBy(x => x.Id).Where(x => x.Email_ID == Useremail && string.Compare(x.Dateshortstring,StartDate) >=0 && string.Compare(x.Dateshortstring, EndDate) <= 0).Select(x => x.Number_of_hours).ToListAsync();
           
                var Task_Detail = await _context.Timesheet.OrderBy(x => x.Id).Where(x => x.Email_ID == Useremail && string.Compare(x.Dateshortstring,StartDate) >=0 && string.Compare(x.Dateshortstring, EndDate) <= 0).Select(x => x.Task_Detail).ToListAsync();
            
                var Project_Name = await _context.Timesheet.OrderBy(x => x.Id).Where(x => x.Email_ID == Useremail && string.Compare(x.Dateshortstring,StartDate) >=0 && string.Compare(x.Dateshortstring, EndDate) <= 0).Select(x => x.Project_Name).ToListAsync();



            return new QueryresultDto
            {
                
                Date = Date,
                NoofHours = Number_of_hours,
                Taskdetail = Task_Detail,
                ProjectName = Project_Name,
            };
        }

        [HttpPost("addtimesheet")]
        public async Task<ActionResult<QueryresultDto>> Addsheet(SheetDto sheetdto)
        {
            var datestring = sheetdto.Date.AddDays(1).ToShortDateString();

            var elemstring = sheetdto.Date.AddDays(1).ToString("yyyyMMdd");
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email_ID == sheetdto.Email_ID);
			var sheet = new Timesheet
            {
                Number_of_hours = sheetdto.NoofHours,
                Task_Detail = sheetdto.Taskdetail,
                Project_Name = sheetdto.ProjectName,
                Email_ID = sheetdto.Email_ID,
                Date = sheetdto.Date.AddDays(1),
                Datestring = datestring,
                Dateshortstring = elemstring,
                FirstName = user.FirstName,
                LastName = user.LastName
            };
             _context.Timesheet.Add(sheet);
            await _context.SaveChangesAsync();

            var currentDate = sheetdto.Date.AddDays(1);

            var Date = await _context.Timesheet.OrderBy(x => x.Id).Where(x => x.Email_ID == sheet.Email_ID && x.Date == currentDate).Select(x => x.Datestring).ToListAsync();
            

            var Number_of_hours = await _context.Timesheet.OrderBy(x => x.Id).Where(x => x.Email_ID == sheet.Email_ID && x.Date == currentDate).Select(x => x.Number_of_hours ).ToListAsync();
           
            var Task_Detail = await _context.Timesheet.OrderBy(x => x.Id).Where(x => x.Email_ID == sheet.Email_ID && x.Date == currentDate).Select(x => x.Task_Detail).ToListAsync();
            
            var Project_Name = await _context.Timesheet.OrderBy(x => x.Id).Where(x => x.Email_ID == sheet.Email_ID && x.Date == currentDate).Select(x => x.Project_Name).ToListAsync();

           
            return new QueryresultDto
            {
                Date = Date,
                NoofHours = Number_of_hours,
                Taskdetail = Task_Detail,
                ProjectName = Project_Name
            };
        }     
        
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        { 
            if (await UserExists(registerDto.Username)) return BadRequest("Username already Present");
            using var hmac = new HMACSHA512();
            
                var user = new AppUser
                {
                    Username = registerDto.Username,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                    PasswordSalt = hmac.Key,
                };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();



            return new UserDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user),
                UserPosition = ""
            };
        }

        [HttpPost("registernewuser")]
        public async Task<ActionResult<UserDto>> RegisterNewUser(RegisternewuserDto registernewuserDto){
            if (await EmailExists(registernewuserDto.Email)) return BadRequest("Email not present in directory");
            
            UsrEmail user1 = await _context.UsrEmail.SingleOrDefaultAsync(x => x.EmailID == registernewuserDto.Email);

            if  (user1 == null) return Unauthorized("Invalid Email");         

            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                FirstName = user1.Firstname,
                ManagerMail = user1.ManagerMail,
                LastName = user1.Lastname,
                DOB = user1.DOB,
                Email_ID = registernewuserDto.Email,
                Username = registernewuserDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registernewuserDto.Password)),
                PasswordSalt = hmac.Key,
                Position = user1.Position
            };
             _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.Username,
                Email_ID = user.Email_ID,
                Token = _tokenService.CreateToken(user),
                UserPosition = user.Position
            };
            

        }

        [HttpPost("addemail")]
        public async Task<ActionResult<EmailDto>> AddEmail (EmailDto emailDto)
        {   
            if (await UserExists(emailDto.Email)) return BadRequest("Email already Present");
            var user = new UsrEmail
            {
                EmailID= emailDto.Email,
                Firstname = emailDto.FirstName,
                Lastname = emailDto.LastName,
                DOB = emailDto.DOB,
                ManagerMail = emailDto.ManagerMail,
                Position = emailDto.Position
            };
            _context.UsrEmail.Add(user);
            await _context.SaveChangesAsync();

            return new EmailDto{
                Email= emailDto.Email,
                FirstName = emailDto.FirstName,
                LastName = emailDto.LastName,
                DOB = emailDto.DOB
            };
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto logindto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Email_ID == logindto.Email);

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(logindto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");

            }
            var employees = await _context.Users.OrderBy(x => x.Id).Where(x => x.ManagerMail == user.Email_ID).Select(x => x.FirstName).ToListAsync();

            var projects = new List<string>();
            if(user.Position != "Manager"){
                projects =await _context.ClientTable.OrderBy(x => x.ProjectName).Where(x => x.Manager == user.ManagerMail).Select(x => x.ProjectName).Distinct().ToListAsync();
            }
            else {  
                projects =await _context.ClientTable.OrderBy(x => x.ProjectName).Where(x => x.Manager == user.Email_ID).Select(x => x.ProjectName).Distinct().ToListAsync();                
            };              
            var clients = await _context.ClientTable.OrderBy(x => x.ProjectName).Where(x => x.Manager == user.Email_ID).Select(x => x.ClientName).Distinct().ToListAsync();
            var employeeEmail = await _context.Users.OrderBy(x => x.Id).Where(x => x.ManagerMail == user.Email_ID).Select(x => x.Email_ID).ToListAsync();
            
            var employeeswhole = new List<string>();
            var employeeswholemail = new List<string>();

            if(user.Position == "HR"){
                employeeswhole = await _context.Users.OrderBy(x => x.Id).Select(x => x.FirstName).ToListAsync();

                employeeswholemail = await _context.Users.OrderBy(x => x.Id).Select(x => x.Email_ID).ToListAsync();
            
            }
            
           return new UserDto
            {   
                EmployeesWhole = employeeswhole,
                EmployeesWholeMail = employeeswholemail,
                Projects = projects,
                Clients = clients,
                Employees = employees,
                Username = user.FirstName,
                Email_ID = user.Email_ID,
                UserPosition = user.Position,
                EmployeeEmail = employeeEmail              
            };

        }

          

       

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.Email_ID == username.ToLower());
        }

        private async Task<bool> EmailExists(string email)
        {
            if (await _context.UsrEmail.AnyAsync(x => x.EmailID == email)){
                return false;
            }
            else{
                return true;
            }
        }

    }
}