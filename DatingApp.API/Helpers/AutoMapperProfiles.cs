using System.Linq;
using AutoMapper;
using DatingApp.API.Models;
using DatingApp.API.Models.DataTransferObjects;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserModel, UserForListDataObject>()
                .ForMember(dest => dest.PhotoUrl,
                    options =>
                        options.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))

                .ForMember(dest => dest.Age,
                    opt => opt.MapFrom(
                        src => src.DateOfBirth.CalculateAge()));

            CreateMap<UserModel, UserForDetailedViewDataObject>()
                .ForMember(dest => dest.PhotoUrl,
                    options
                        => options.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))

                .ForMember(dest => dest.Age,
                    opt => opt.MapFrom(
                        src => src.DateOfBirth.CalculateAge()));


            CreateMap<Photo, PhotoForDetailsDto>();
        }
    }
}
