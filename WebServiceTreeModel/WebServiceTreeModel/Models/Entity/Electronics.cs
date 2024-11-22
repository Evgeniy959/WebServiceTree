using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WebServiceTreeModel.Models.Entity
{
    public class Electronics
    {
        [BsonId]
        public string? Id { get; set; }

        [BsonElement("Parent")]
        [JsonPropertyName("Parent")]
        public string ParentReference { get; set; } = null!;

        public int Order { get; set; }

    }
}
