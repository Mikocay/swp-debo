﻿using System.Text.Json.Serialization;

namespace swp391_debo_be.Dto.Implement
{
    public class EmployeeDto
    {
        [JsonIgnore]
        public Guid? Id { get; set; } = Guid.NewGuid();

        public int? Role { get; set; }
        public string? RoleName { get; set; }
        public string? Username { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }
        public string? NewPassword { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public bool? Gender { get; set; }

        public string? Phone { get; set; }

        public string? Address { get; set; }

        public DateTime? DateOfBirthday { get; set; }

        public string? MedRec { get; set; }

        public string? Avt { get; set; }
        public bool? IsFirstTime { get; set; }
        public MedRecMetaDataDto? MedRecMetaData { get; set; }
    }
}
