﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TosProject.Model.Dto
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string EmployeeNo { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public string Contact { get; set; }
        public string Bio { get; set; }
    }
}
